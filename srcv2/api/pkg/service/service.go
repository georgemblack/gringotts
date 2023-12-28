package service

import (
	"github.com/georgemblack/gringotts/api/pkg/application"
	"github.com/georgemblack/gringotts/api/pkg/repository"
)

func ImportRawTransactions(conf application.Config) error {
	repository.GetTransactions(conf)
	return nil
}
