const errorMiddleware = (err, req, res, next) => {
  
}

// Create a subscription -> middleware( check for renewal data) -> middleware (check for errors) -> next -> controller