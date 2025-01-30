# Fetch Assignment

## Description

This program is designed to [briefly describe what your program does]. It is implemented in [programming language] and aims to [mention the main goal or functionality of your program].

## Features

- Feature 1: accept receipt data and calculate the point total, it then returns the id generated
- Feature 2: accepts an id and searches for the point total for that id, if not found returns 400 error otherwise returns the points for that id

## Installation

To install and run this program, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/fetch-assignment.git
   ```

2. Navigate to the project directory:

   ```bash
   cd fetch-assignment
   ```

3. Build the Docker image:

   ```bash
   docker build -t fetch-assignment .
   ```

4. Run the Docker container:

   ```bash
   docker run -p 3001:3001 fetch-assignment
   ```

   ## Testing the API

   To test the API, you can use Postman or any other API testing tool.

   ### POST /receipts

   1. Open Postman and create a new POST request.
   2. Set the URL to `http://localhost:3001/receipts/process`.
   3. In the body tab, select `raw` and `JSON` format.
   4. Add the receipt data in JSON format. For example:
      ```json
      {
        "retailer": "Target",
        "purchaseDate": "2023-10-01",
        "items": [
          {
            "shortDescription": "Mountain Dew",
            "price": "1.99"
          }
        ],
        "total": "1.99"
      }
      ```
   5. Send the request and note the `id` received in the response.

   ### GET /receipts/{id}/points

   1. Create a new GET request in Postman.
   2. Set the URL to `http://localhost:3001/receipts/{id}/points`, replacing `{id}` with the `id` received from the POST request.
   3. Send the request to get the points for the given receipt.

## Usage

## Contributing

If you would like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-branch
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Description of changes"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-branch
   ```
5. Create a pull request.

## License

This project is licensed under the [Your License] License - see the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions or suggestions, please feel free to contact me at [your email address].

# receipt-processor-challenge
