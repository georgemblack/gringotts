package handlers

import (
	"net/http"

	"github.com/georgemblack/gringotts/api/pkg/application"
	"github.com/georgemblack/gringotts/api/pkg/service"
	"github.com/gin-gonic/gin"
)

func importTransactions(conf application.Config) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		service.ImportRawTransactions(conf)
		ctx.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	}
}
