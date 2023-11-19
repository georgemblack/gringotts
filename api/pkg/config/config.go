package config

import "os"

type Config struct {
	DBUser     string
	DBPassword string
	DBHost     string
}

// Load the configuration, and set defaults if not provided
func LoadConfig() Config {
	conf := Config{}
	conf.DBUser = getEnvOrDefault("DB_USER", "root")
	conf.DBPassword = getEnvOrDefault("DB_PASSWORD", "password")
	conf.DBHost = getEnvOrDefault("DB_HOST", "localhost")
	return Config{}
}

func getEnvOrDefault(key, defaultValue string) string {
	if result := os.Getenv(key); result != "" {
		return result
	}
	return defaultValue
}
