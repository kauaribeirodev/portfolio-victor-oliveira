import z from "zod";

export const ProjectSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  image_url: z.string(),
  category: z.string(),
  duration: z.string(),
  year: z.string(),
  drive_link: z.string(),
  is_featured: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type ProjectType = z.infer<typeof ProjectSchema>;

export const ProjectFormSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  description: z.string().min(1, "Descrição é obrigatória"),
  image_url: z.string().url("URL da imagem deve ser válida"),
  category: z.string().min(1, "Categoria é obrigatória"),
  duration: z.string().min(1, "Duração é obrigatória"),
  year: z.string().min(1, "Ano é obrigatório"),
  drive_link: z.string().url("Link do Drive deve ser válido"),
  is_featured: z.boolean().optional().default(false),
});

export type ProjectFormType = z.infer<typeof ProjectFormSchema>;

export const SiteTextSchema = z.object({
  id: z.number(),
  section: z.string(),
  key: z.string(),
  content: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type SiteTextType = z.infer<typeof SiteTextSchema>;

export const SiteTextFormSchema = z.object({
  section: z.string().min(1, "Seção é obrigatória"),
  key: z.string().min(1, "Chave é obrigatória"),
  content: z.string().min(1, "Conteúdo é obrigatório"),
});

export type SiteTextFormType = z.infer<typeof SiteTextFormSchema>;
