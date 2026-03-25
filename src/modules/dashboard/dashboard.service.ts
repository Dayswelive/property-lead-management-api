import { prisma } from "../../lib/prisma";

export async function getDashboardSummary() {
  const [
    propertiesByStatusRaw,
    leadsByStatusRaw,
    leadsByPriorityRaw,
    totalLeads,
    bookedLeads,
  ] = await Promise.all([
    prisma.property.groupBy({
      by: ["status"],
      _count: {
        status: true,
      },
    }),
    prisma.lead.groupBy({
      by: ["status"],
      _count: {
        status: true,
      },
    }),
    prisma.lead.groupBy({
      by: ["priority"],
      _count: {
        priority: true,
      },
    }),
    prisma.lead.count(),
    prisma.lead.count({
      where: {
        status: "Booked",
      },
    }),
  ]);

  const propertiesByStatus = {
    Available: 0,
    Booked: 0,
  };

  for (const item of propertiesByStatusRaw) {
    propertiesByStatus[item.status] = item._count.status;
  }

  const leadsByStatus = {
    New: 0,
    Contacted: 0,
    Visited: 0,
    Booked: 0,
    Lost: 0,
  };

  for (const item of leadsByStatusRaw) {
    leadsByStatus[item.status] = item._count.status;
  }

  const leadsByPriority = {
    Hot: 0,
    Warm: 0,
    Cold: 0,
  };

  for (const item of leadsByPriorityRaw) {
    leadsByPriority[item.priority] = item._count.priority;
  }

  const conversionRate = totalLeads === 0 ? 0 : bookedLeads / totalLeads;

  return {
    propertiesByStatus,
    leadsByStatus,
    leadsByPriority,
    conversionRate,
  };
}
