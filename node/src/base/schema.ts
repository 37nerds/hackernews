import { z } from "zod";

export const id_schema = z.string().length(24);
