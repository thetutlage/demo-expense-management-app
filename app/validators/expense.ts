import vine from '@vinejs/vine'

export const createExpenseValidator = vine.compile(
  vine.object({
    title: vine.string().minLength(4),
    amount: vine.number().positive(),
    transactionDate: vine.date(),
    categoryId: vine.number(),
  })
)
