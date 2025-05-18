Feature: Listing sorted products endpoint

Scenario: Check the api - a request is made with more sorting weight on unit sales
	Given I send a POST request to "/v1/products/sort-order" with body like "req_body_weight_on_sales.json"
	Then the response status code should be 200
	Then the response should match "res_list_ordering_weight_sales_unit.json"

Scenario: Check the api - a request is made with more sorting weight on unit stock ratio
	Given I send a POST request to "/v1/products/sort-order" with body like "req_body_weight_on_stock_ratio.json"
	Then the response status code should be 200
	Then the response should match "res_list_ordering_weight_stock_ratio.json"

Scenario: Check the api - a request should return bad request for an invalir request body
	Given I send a POST request to "/v1/products/sort-order" with body like "wrong_req_body.json"
	Then the response status code should be 400
