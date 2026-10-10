package main

import (
  "github.com/gofiber/fiber/v3"
  "github.com/gofiber/fiber/v3/middleware/cors"
  "github.com/gofiber/fiber/v3/middleware/static"
  "log"
  "fmt"
)

func main() {
	app := fiber.New()

app.Use(cors.New(cors.Config{
	AllowOrigins: []string{"*"},
	AllowMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
	AllowHeaders: []string{"Origin", "Content-Type", "Accept", "Authorization"},
}))
  
app.Use("/", static.New("./public"))
  
	// Render HTML pada route /
	app.Get("/", func(c fiber.Ctx) error {
		return c.SendFile("./public/index.html")
	})

	// Sajikan JS, CSS, gambar, dan file statis lainnya

  app.Post("/files/upload", func(c fiber.Ctx) error {
    file, err := c.FormFile("file")
    if err != nil {
        return err
    }

    path := "./uploads/" + file.Filename

    if err := c.SaveFile(file, path); err != nil {
        return err
    }

    return c.JSON(fiber.Map{
        "filename": file.Filename,
        "download_url": "/files/" + file.Filename + "/download",
    })
})

app.Get("/files/:filename/download", func(c fiber.Ctx) error {
    filename := c.Params("filename")
    path := "./uploads/" + filename

    return c.Download(path, filename)
})


  fmt.Println("http://localhost:3000")
	log.Fatal(app.Listen("0.0.0.0:3001"))
}