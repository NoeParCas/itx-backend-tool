import express, { Request, Response } from 'express'
import { config as envConfig } from 'dotenv-flow'

envConfig()
const app = express()
const port = process.env.PORT || 5001

app.get('/status', (req: Request, res: Response) => res.status(200).send('All up and running'))

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
