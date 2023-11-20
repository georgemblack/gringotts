package handlers

import (
	"github.com/georgemblack/gringotts/api/pkg/application"
	"github.com/gin-gonic/gin"
)

// Run starts the server with all routes
func Run(config application.Config) {
	r := gin.Default()
	r.POST("/transactions/import", importTransactions(config))
	r.Run()
}
