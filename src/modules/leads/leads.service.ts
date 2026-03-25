import { prisma } from "../../lib/prisma";
import { LeadStatus, PropertyStatus } from "../../generated/prisma/enums";
import { validateLeadTransition } from "./leads-transition";
import type {
  CreateLeadInput,
  UpdateLeadInput,
  TransitionLeadInput,
} from "./leads.validation";

export async function createLead(data: CreateLeadInput) {
  const property = await prisma.property.findUnique({
    where: { id: data.propertyId },
  });

  if (!property) {
    throw new Error("Property not found");
  }

  if (property.status !== PropertyStatus.Available) {
    throw new Error("Lead can only be created for an available property");
  }

  const existingLead = await prisma.lead.findFirst({
    where: {
      phone: data.phone,
      propertyId: data.propertyId,
    },
  });

  if (existingLead) {
    throw new Error(
      "A lead with the same phone number already exists for this property",
    );
  }

  const lead = await prisma.lead.create({
    data: {
      buyerName: data.buyerName,
      phone: data.phone,
      email: data.email,
      propertyId: data.propertyId,
      priority: data.priority,
      notes: data.notes,
      status: LeadStatus.New,
    },
    include: {
      property: true,
    },
  });

  return lead;
}

export async function getLeads(query: any) {
  const { status, priority, property_id, page = 1, limit = 10 } = query;

  const where: any = {};

  if (status) where.status = status;
  if (priority) where.priority = priority;
  if (property_id) where.propertyId = Number(property_id);

  const skip = (Number(page) - 1) * Number(limit);

  const [data, total] = await Promise.all([
    prisma.lead.findMany({
      where,
      skip,
      take: Number(limit),
      orderBy: { createdAt: "desc" },
      include: {
        property: true,
      },
    }),
    prisma.lead.count({ where }),
  ]);

  return {
    data,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
    },
  };
}

export async function getLeadById(id: number) {
  const lead = await prisma.lead.findUnique({
    where: { id },
    include: {
      property: true,
    },
  });

  if (!lead) {
    throw new Error("Lead not found");
  }

  return lead;
}

export async function updateLead(id: number, data: UpdateLeadInput) {
  const existingLead = await prisma.lead.findUnique({
    where: { id },
  });

  if (!existingLead) {
    throw new Error("Lead not found");
  }

  const updatedLead = await prisma.lead.update({
    where: { id },
    data: {
      priority: data.priority,
      notes: data.notes,
    },
    include: {
      property: true,
    },
  });

  return updatedLead;
}

export async function transitionLead(id: number, data: TransitionLeadInput) {
  const lead = await prisma.lead.findUnique({
    where: { id },
    include: {
      property: true,
    },
  });

  if (!lead) {
    throw new Error("Lead not found");
  }

  const nextStatus = data.status as LeadStatus;

  validateLeadTransition(lead.status, nextStatus);

  const updatedLead = await prisma.$transaction(async (tx) => {
    const newLead = await tx.lead.update({
      where: { id },
      data: {
        status: nextStatus,
      },
      include: {
        property: true,
      },
    });

    if (nextStatus === LeadStatus.Booked) {
      await tx.property.update({
        where: { id: lead.propertyId },
        data: {
          status: PropertyStatus.Booked,
        },
      });
    }

    return newLead;
  });

  return updatedLead;
}
