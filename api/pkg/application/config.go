package application

import (
	"fmt"
	"os"

	"github.com/georgemblack/gringotts/api/pkg/types"
	_ "github.com/lib/pq"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type Config struct {
	DBHost     string
	DBName     string
	DBUser     string
	DBPassword string
	DBSSLMode  string

	DB *gorm.DB
}

// LoadConfig loads the configuration, and set defaults if not provided
func LoadConfig() (Config, error) {
	conf := Config{}
	conf.DBHost = getEnvOrDefault("DB_HOST", "localhost")
	conf.DBName = getEnvOrDefault("DB_NAME", "postgres")
	conf.DBUser = getEnvOrDefault("DB_USER", "postgres")
	conf.DBPassword = getEnvOrDefault("DB_PASSWORD", "postgres")
	conf.DBSSLMode = getEnvOrDefault("DB_SSL_MODE", "disable")

	// Open DB connection
	connStr := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=%s", conf.DBHost, "5432", conf.DBUser, conf.DBPassword, conf.DBName, conf.DBSSLMode)
	db, err := gorm.Open(postgres.Open(connStr), &gorm.Config{})
	if err != nil {
		return Config{}, err
	}
	conf.DB = db

	// Migrate the schema
	db.AutoMigrate(&types.Transaction{})

	return conf, nil
}

func getEnvOrDefault(key, defaultValue string) string {
	if result := os.Getenv(key); result != "" {
		return result
	}
	return defaultValue
}
