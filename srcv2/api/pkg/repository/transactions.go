package repository

import (
	"github.com/georgemblack/gringotts/api/pkg/application"
	"github.com/georgemblack/gringotts/api/pkg/models"
)

func GetTransactions(conf application.Config) ([]models.Transaction, error) {
	conf.DB.Create(&models.Transaction{Key: "blah"})

	var transactions []models.Transaction
	result := conf.DB.Find(&transactions)
	if result.Error != nil {
		return transactions, application.WrapErr(result.Error, "failed to query transactions")
	}
	return transactions, nil
}
