import { LeadStatus } from "../../generated/prisma/enums";

const nextStatusMap: Record<LeadStatus, LeadStatus | null> = {
  New: LeadStatus.Contacted,
  Contacted: LeadStatus.Visited,
  Visited: LeadStatus.Booked,
  Booked: null,
  Lost: null,
};

export function validateLeadTransition(
  currentStatus: LeadStatus,
  nextStatus: LeadStatus,
) {
  if (currentStatus === LeadStatus.Booked) {
    throw new Error(
      "Cannot transition a lead from 'Booked'. It is a terminal state.",
    );
  }

  if (currentStatus === LeadStatus.Lost) {
    throw new Error(
      "Cannot transition a lead from 'Lost'. It is a terminal state.",
    );
  }

  if (nextStatus === LeadStatus.Lost) {
    return;
  }

  const expectedNext = nextStatusMap[currentStatus];

  if (expectedNext !== nextStatus) {
    throw new Error(
      `Cannot move from '${currentStatus}' to '${nextStatus}'. Next valid status is '${expectedNext}'.`,
    );
  }
}
