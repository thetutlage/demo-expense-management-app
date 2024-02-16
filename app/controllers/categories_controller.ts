import Category from '#models/category'
import { createCategoryValidator } from '#validators/category'
import type { HttpContext } from '@adonisjs/core/http'

export default class CategoriesController {
  async create({ view }: HttpContext) {
    return view.render('pages/categories/create')
  }

  async store({ request, response }: HttpContext) {
    const { name, budget } = await request.validateUsing(createCategoryValidator)
    await Category.create({ name, budget })
    response.redirect('/')
  }
}
