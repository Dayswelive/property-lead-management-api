import { prisma } from "../../lib/prisma";

export async function getProperties(query: any) {
  const { city, status, bedrooms, page = 1, limit = 10 } = query;

  const where: any = {};

  if (city) where.city = city;
  if (status) where.status = status;
  if (bedrooms) where.bedrooms = Number(bedrooms);

  const skip = (Number(page) - 1) * Number(limit);

  const [data, total] = await Promise.all([
    prisma.property.findMany({
      where,
      skip,
      take: Number(limit),
      orderBy: { createdAt: "desc" },
    }),
    prisma.property.count({ where }),
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

export async function getPropertyById(id: number) {
  const property = await prisma.property.findUnique({
    where: { id },
  });

  if (!property) {
    throw new Error("Property not found");
  }

  const leads = await prisma.lead.groupBy({
    by: ["status"],
    _count: true,
    where: { propertyId: id },
  });

  return {
    property,
    leadsByStatus: leads,
  };
}
