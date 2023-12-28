package models

import "gorm.io/gorm"

type Transaction struct {
	gorm.Model
	Key              string `gorm:"unique; not null"`
	Date             string
	Description      string
	Merchant         Merchant
	MerchantCategory MerchantCategory
	Category         Category
	Amount           string
	Credit           bool
	Account          string
	Notes            string
	Skipped          bool
}

// Reviewed determines if a transaction has been manually process or not.
// When a transaction is processed, it has a merchant, merchant category, and category. Or, it has been skipped.
func (t *Transaction) Reviewed() bool {
	if t.Skipped {
		return true
	}
	if t.Merchant.Name == "" || t.MerchantCategory.Name == "" || t.Category.Name == "" {
		return false
	}
	return true
}

type Merchant struct {
	gorm.Model
	Name         string `gorm:"unique; not null"`
	Transactions []Transaction
}

type MerchantCategory struct {
	gorm.Model
	Name         string `gorm:"unique; not null"`
	Transactions []Transaction
}

type Category struct {
	gorm.Model
	Name         string `gorm:"unique; not null"`
	Transactions []Transaction
}
