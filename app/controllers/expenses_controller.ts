import Category from '#models/category'
import Expense from '#models/expense'
import { createExpenseValidator } from '#validators/expense'
import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'

export default class ExpensesController {
  async index({ view }: HttpContext) {
    const categories = await Category.all()
    const expenses = await Expense.query().preload('category')

    return view.render('pages/expenses/list', {
      categories,
      expenses,
    })
  }

  async create({ view }: HttpContext) {
    const categories = await Category.all()
    return view.render('pages/expenses/create', { categories })
  }

  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createExpenseValidator)
    const category = await Category.findOrFail(payload.categoryId)

    await category.related('expenses').create({
      title: payload.title,
      amount: payload.amount,
      transactionDate: DateTime.fromJSDate(payload.transactionDate),
    })

    response.redirect('/')
  }
}
