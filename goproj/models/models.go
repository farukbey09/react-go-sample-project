package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Cars struct {
	// json struct ögeleri büyük harfle başlaması lazımmış :D
	ID    primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Plaka string             `json:"plaka" bson:"plaka"`
	Marka string             `json:"marka" bson:"marka"`
	Model string             `json:"model" bson:"model"`
}
