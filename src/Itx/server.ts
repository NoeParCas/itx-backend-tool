import express, { Request, Response } from 'express'
import { config as envConfig} from 'dotenv-flow'
import { loadContainer } from './Infrastructure/DependencyInjection'

envConfig()
const app = express()
const port = process.env.PORT || 5001
const container = loadContainer()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/status', (req: Request, res: Response) => res.status(200).send('All up and running'))

app.post('/v1/listed-products', async (req: Request, res: Response) => {
  const listedProductsController = (await container).get('Apps.Controller.ListedProductsController')
  
  await listedProductsController.run(req, res)
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
