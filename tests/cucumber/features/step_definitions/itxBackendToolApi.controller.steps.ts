import request from 'supertest'
import express from 'express'
import {readFileSync} from 'node:fs'
import { BeforeAll, Given, Then, AfterAll } from '@cucumber/cucumber'
import {loadContainer} from '../../../../src/Itx/Infrastructure/DependencyInjection/index'
import assert from 'node:assert'

let _request: request.Test
let server
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const container = loadContainer()
const FIXTURES_PATH = 'tests/cucumber/fixtures/'

Given('I send a POST request to {string} with body like {string}', (route: string, file: string) => {
  const data = JSON.parse(readFileSync(FIXTURES_PATH + file).toString())
	_request = request(server).post(route).send(data.body)
})

Then('the response should match {string}', async(file) => {
  const data = JSON.parse(readFileSync(FIXTURES_PATH + file).toString())
  const response = await _request

  assert.deepStrictEqual(response.body, data)
})

Then('the response status code should be {int}', async(status) => {
  const response = await _request

  assert.strictEqual(response.status, status)
})

BeforeAll(async () => {
  app.post('/v1/products/sort-order', async (req, res) => {
    const controller = (await container).get('Apps.Controller.ListedProductsController')

    await controller.run(req, res)
  })

  server = await app.listen('6001')
})

AfterAll(async () => {
  if (server) {
    await server.close((err) => {
      if (err) {
        console.error(err)
      } else {
        console.log('Server Closed')
      }
})
}}
)
