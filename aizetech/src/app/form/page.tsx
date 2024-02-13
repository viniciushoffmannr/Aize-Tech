'use client'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const createProcessFormSchema = z.object({
  name: z.string().min(3, 'O nome precisa ser preenchdo.'),
  processCode: z.coerce.number(),
  company: z.string(),
  setor: z.string(),
  file: z.instanceof(FileList).transform((list) => list.item(0)!),
})

type CreateProcessFormData = z.infer<typeof createProcessFormSchema>

export default function MainForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProcessFormData>({
    resolver: zodResolver(createProcessFormSchema),
  })

  function createProcess(data: CreateProcessFormData) {
    console.log(data)
  }

  return (
    <main className="h-screen bg-zinc-950 text-zinc-300 flex-col gap-10 flex items-center justify-content">
      <form
        onSubmit={handleSubmit(createProcess)}
        className="flex flex-col gap-4 w-full max-w-xs"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="name">Nome do processo</label>
          <input
            type="text"
            className="border border-zinc-600 shadow-sm rounded h-10 px-3 bg-zinc-900 text-white"
            {...register('name')}
          />
          {errors.name && <span>{errors.name.message}</span>}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="processCode">Código do processo</label>
          <input
            type="number"
            {...register('processCode')}
            className="border border-zinc-600 shadow-sm rounded h-10 px-3 bg-zinc-900 text-white"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="company">Nome da empresa</label>
          <input
            type="number"
            {...register('company')}
            className="border border-zinc-600 shadow-sm rounded h-10 px-3 bg-zinc-900 text-white"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="setor">Setor</label>
          <input
            type="text"
            {...register('setor')}
            className="border border-zinc-600 shadow-sm rounded h-10 px-3 bg-zinc-900 text-white"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="file">Envie arquivos</label>
          <input type="file" accept="image/*" {...register('file')} />
          {errors.file && <span>{errors.file.message}</span>}
        </div>

        <button
          type="submit"
          className="bg-emerald-500 rounded font-semibold text-white h-10 hover:bg-emerald-600"
        >
          Salvar
        </button>
      </form>
    </main>
  )
}
