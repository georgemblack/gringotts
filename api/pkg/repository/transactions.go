package repository

import (
	"github.com/georgemblack/gringotts/api/pkg/application"
	"github.com/georgemblack/gringotts/api/pkg/types"
)

func GetTransactions(conf application.Config) ([]types.Transaction, error) {
	conf.DB.Create(&types.Transaction{ExternalID: "blah"})

	var transactions []types.Transaction
	result := conf.DB.Find(&transactions)
	if result.Error != nil {
		return transactions, application.WrapErr(result.Error, "failed to query transactions")
	}
	return transactions, nil
}
