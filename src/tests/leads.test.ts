import request from "supertest";
import app from "../app";

let token = "";

beforeAll(async () => {
  const loginResponse = await request(app).post("/auth/login").send({
    email: "admin@example.com",
    password: "password123",
  });

  token = loginResponse.body.data.token;
});

describe("Leads API", () => {
  it("should allow a valid transition from New to Contacted", async () => {
    const leadsResponse = await request(app)
      .get("/leads?status=New&limit=1")
      .set("Authorization", `Bearer ${token}`);

    const lead = leadsResponse.body.data.data[0];

    expect(lead).toBeDefined();

    const transitionResponse = await request(app)
      .post(`/leads/${lead.id}/transition`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        status: "Contacted",
      });

    expect(transitionResponse.status).toBe(200);
    expect(transitionResponse.body.success).toBe(true);
    expect(transitionResponse.body.data.status).toBe("Contacted");
  });

  it("should reject an invalid transition from New to Visited", async () => {
    const createResponse = await request(app)
      .post("/leads")
      .set("Authorization", `Bearer ${token}`)
      .send({
        buyerName: "Invalid Transition User",
        phone: `90000${Date.now().toString().slice(-5)}`,
        email: `invalid${Date.now()}@example.com`,
        propertyId: 1,
        priority: "Hot",
        notes: "Transition test",
      });

    const leadId = createResponse.body.data.id;

    const transitionResponse = await request(app)
      .post(`/leads/${leadId}/transition`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        status: "Visited",
      });

    expect(transitionResponse.status).toBe(400);
    expect(transitionResponse.body.success).toBe(false);
    expect(transitionResponse.body.message).toContain(
      "Cannot move from 'New' to 'Visited'",
    );
  });

  it("should reject duplicate lead for same phone and same property", async () => {
    const phone = `91111${Date.now().toString().slice(-5)}`;
    const email1 = `dup1-${Date.now()}@example.com`;
    const email2 = `dup2-${Date.now()}@example.com`;

    const firstResponse = await request(app)
      .post("/leads")
      .set("Authorization", `Bearer ${token}`)
      .send({
        buyerName: "Duplicate Lead User 1",
        phone,
        email: email1,
        propertyId: 1,
        priority: "Warm",
        notes: "First create",
      });

    expect(firstResponse.status).toBe(201);

    const secondResponse = await request(app)
      .post("/leads")
      .set("Authorization", `Bearer ${token}`)
      .send({
        buyerName: "Duplicate Lead User 2",
        phone,
        email: email2,
        propertyId: 1,
        priority: "Hot",
        notes: "Duplicate create",
      });

    expect(secondResponse.status).toBe(400);
    expect(secondResponse.body.success).toBe(false);
    expect(secondResponse.body.message).toContain(
      "A lead with the same phone number already exists for this property",
    );
  });
});
