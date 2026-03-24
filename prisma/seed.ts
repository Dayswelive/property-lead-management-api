import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import {
  PropertyStatus,
  LeadPriority,
  LeadStatus,
  UserRole,
} from "../src/generated/prisma/enums";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });
async function main() {
  await prisma.lead.deleteMany();
  await prisma.user.deleteMany();
  await prisma.property.deleteMany();

  const passwordHash = await bcrypt.hash("password123", 10);

  await prisma.user.createMany({
    data: [
      {
        name: "Admin User",
        email: "admin@example.com",
        passwordHash,
        role: UserRole.Admin,
      },
      {
        name: "Agent One",
        email: "agent1@example.com",
        passwordHash,
        role: UserRole.Agent,
      },
      {
        name: "Agent Two",
        email: "agent2@example.com",
        passwordHash,
        role: UserRole.Agent,
      },
    ],
  });

  const properties = await Promise.all([
    prisma.property.create({
      data: {
        title: "Modern 2BHK Apartment",
        address: "12 MG Road",
        city: "Bangalore",
        price: "7500000.00",
        bedrooms: 2,
        status: PropertyStatus.Available,
      },
    }),
    prisma.property.create({
      data: {
        title: "Luxury 3BHK Villa",
        address: "45 Whitefield Main Rd",
        city: "Bangalore",
        price: "18000000.00",
        bedrooms: 3,
        status: PropertyStatus.Available,
      },
    }),
    prisma.property.create({
      data: {
        title: "Compact Studio Home",
        address: "8 Indiranagar 100 Ft Rd",
        city: "Bangalore",
        price: "4200000.00",
        bedrooms: 1,
        status: PropertyStatus.Available,
      },
    }),
    prisma.property.create({
      data: {
        title: "Family 4BHK House",
        address: "27 Koramangala 5th Block",
        city: "Bangalore",
        price: "22000000.00",
        bedrooms: 4,
        status: PropertyStatus.Available,
      },
    }),
    prisma.property.create({
      data: {
        title: "Budget 2BHK Flat",
        address: "19 Electronic City Phase 1",
        city: "Bangalore",
        price: "5600000.00",
        bedrooms: 2,
        status: PropertyStatus.Available,
      },
    }),
    prisma.property.create({
      data: {
        title: "Sea View Apartment",
        address: "10 Marine Drive",
        city: "Mumbai",
        price: "25000000.00",
        bedrooms: 3,
        status: PropertyStatus.Available,
      },
    }),
    prisma.property.create({
      data: {
        title: "Suburban 2BHK Home",
        address: "33 Powai Lake Rd",
        city: "Mumbai",
        price: "11000000.00",
        bedrooms: 2,
        status: PropertyStatus.Available,
      },
    }),
    prisma.property.create({
      data: {
        title: "Premium Penthouse",
        address: "88 Bandra West",
        city: "Mumbai",
        price: "42000000.00",
        bedrooms: 4,
        status: PropertyStatus.Available,
      },
    }),
    prisma.property.create({
      data: {
        title: "Starter 1BHK Flat",
        address: "5 Andheri East",
        city: "Mumbai",
        price: "6500000.00",
        bedrooms: 1,
        status: PropertyStatus.Available,
      },
    }),
    prisma.property.create({
      data: {
        title: "Spacious 3BHK Residence",
        address: "71 Navi Mumbai Sector 9",
        city: "Mumbai",
        price: "9800000.00",
        bedrooms: 3,
        status: PropertyStatus.Available,
      },
    }),
  ]);

  const leadsData = [
    [
      "Rahul Sharma",
      "9000000001",
      "rahul1@example.com",
      0,
      LeadStatus.New,
      LeadPriority.Hot,
    ],
    [
      "Priya Mehta",
      "9000000002",
      "priya2@example.com",
      1,
      LeadStatus.Contacted,
      LeadPriority.Warm,
    ],
    [
      "Arjun Verma",
      "9000000003",
      "arjun3@example.com",
      2,
      LeadStatus.Visited,
      LeadPriority.Cold,
    ],
    [
      "Sneha Iyer",
      "9000000004",
      "sneha4@example.com",
      3,
      LeadStatus.New,
      LeadPriority.Hot,
    ],
    [
      "Karan Patel",
      "9000000005",
      "karan5@example.com",
      4,
      LeadStatus.Contacted,
      LeadPriority.Warm,
    ],
    [
      "Neha Kapoor",
      "9000000006",
      "neha6@example.com",
      5,
      LeadStatus.Visited,
      LeadPriority.Hot,
    ],
    [
      "Amit Das",
      "9000000007",
      "amit7@example.com",
      6,
      LeadStatus.Lost,
      LeadPriority.Cold,
    ],
    [
      "Pooja Nair",
      "9000000008",
      "pooja8@example.com",
      7,
      LeadStatus.New,
      LeadPriority.Warm,
    ],
    [
      "Rohan Jain",
      "9000000009",
      "rohan9@example.com",
      8,
      LeadStatus.Contacted,
      LeadPriority.Hot,
    ],
    [
      "Meera Joshi",
      "9000000010",
      "meera10@example.com",
      9,
      LeadStatus.Visited,
      LeadPriority.Warm,
    ],
    [
      "Vikas Rao",
      "9000000011",
      "vikas11@example.com",
      0,
      LeadStatus.New,
      LeadPriority.Cold,
    ],
    [
      "Ananya Sen",
      "9000000012",
      "ananya12@example.com",
      1,
      LeadStatus.Contacted,
      LeadPriority.Hot,
    ],
    [
      "Dev Malhotra",
      "9000000013",
      "dev13@example.com",
      2,
      LeadStatus.Lost,
      LeadPriority.Warm,
    ],
    [
      "Isha Singh",
      "9000000014",
      "isha14@example.com",
      3,
      LeadStatus.Visited,
      LeadPriority.Hot,
    ],
    [
      "Nikhil Roy",
      "9000000015",
      "nikhil15@example.com",
      4,
      LeadStatus.New,
      LeadPriority.Warm,
    ],
  ] as const;

  for (const [
    buyerName,
    phone,
    email,
    propertyIndex,
    status,
    priority,
  ] of leadsData) {
    await prisma.lead.create({
      data: {
        buyerName,
        phone,
        email,
        propertyId: properties[propertyIndex].id,
        status,
        priority,
        notes: "Seeded lead",
      },
    });
  }

  console.log("Seed completed");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
