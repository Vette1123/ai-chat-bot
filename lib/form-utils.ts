import * as z from 'zod'

const formSchema = z.object({
  label: z.string().nonempty('Please enter a message.'),
})

type ChatMessage = z.infer<typeof formSchema>

const initialFormValues: ChatMessage = {
  label: '',
}
export { formSchema, initialFormValues, type ChatMessage }
