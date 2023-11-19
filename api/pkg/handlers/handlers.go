package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// Run starts the server with all routes
func Run() {
	
	r := gin.Default()
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})

	r.Run()
}
