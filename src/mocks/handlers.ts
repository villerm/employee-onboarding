import { rest } from "msw";
import offers from "@/demoData/offers.json";
import applicants from "@/demoData/applicants.json";

// Return offer from offers demodata by token
export const handlers = [
  rest.get(`/backend/api/job-offer/:id`, (req, res, ctx) => {
    const { id } = req.params;
    if (id.length !== 64) {
      return res(ctx.status(404));
    }
    const offer = offers.find((item) => item.token === id);
    if (!offer) {
      return res(
        ctx.status(404),
        ctx.json({
          message: "no offer found",
        }),
      );
    }
    return res(
      ctx.status(200),
      ctx.set("Content-Type", "application/json"),
      // Delays response for 500ms.
      ctx.delay(500),
      ctx.json(offer),
    );
  }),

  rest.get(`/backend/api/new-employee-form/:id`, (req, res, ctx) => {
    const { id } = req.params;
    if (id.length !== 64) {
      return res(ctx.status(404));
    }
    const applicantForm = applicants.find((item) => item.token === id);
    if (!applicantForm) {
      return res(ctx.status(404));
    }
    return res(
      ctx.status(200),
      ctx.set("Content-Type", "application/json"),
      // Delays response for 500ms.
      ctx.delay(500),
      ctx.json(applicantForm),
    );
  }),
];

export default handlers;
