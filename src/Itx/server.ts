import express, { Request, Response } from 'express'
import { config as envConfig} from 'dotenv-flow'
import { loadContainer } from './Infrastructure/DependencyInjection'

envConfig()
const app = express()
const port = process.env.PORT || 5001
const container = loadContainer()

app.get('/status', (req: Request, res: Response) => res.status(200).send('All up and running'))

app.get('/v1/listed-products', async (req: Request, res: Response) => {
  const listedProductsController = (await container).get('Apps.Controller.ListedProductsController')
  const allProducts = await listedProductsController.run(req, res)

  res.status(200).send(allProducts)
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
