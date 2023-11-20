package main

import (
	"github.com/georgemblack/gringotts/api/pkg/application"
	"github.com/georgemblack/gringotts/api/pkg/handlers"
)

func main() {
	config, err := application.LoadConfig()
	if err != nil {
		panic(err)
	}
	handlers.Run(config)
}
