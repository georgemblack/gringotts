package types

import "gorm.io/gorm"

type Transaction struct {
	gorm.Model
	ExternalID       string `gorm:"unique"`
	OriginalMerchant string
	Date             string
	Account          string
	Notes            string
}
