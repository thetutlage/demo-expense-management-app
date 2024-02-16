/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const ExpensesController = () => import('#controllers/expenses_controller')
const SessionController = () => import('#controllers/session_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import db from '@adonisjs/lucid/services/db'
import emitter from '@adonisjs/core/services/emitter'
const CategoriesController = () => import('#controllers/categories_controller')

emitter.on('db:query', db.prettyPrint)

router.get('/', [ExpensesController, 'index']).use(middleware.auth())

router.on('/login').render('pages/login')
router.post('/login', [SessionController, 'store'])

router.resource('categories', CategoriesController).use('*', middleware.auth())
router.resource('expenses', ExpensesController).use('*', middleware.auth())
