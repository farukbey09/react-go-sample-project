package main

import (
	"context"
	"fmt"
	"goproj/models"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"

	"encoding/json"
)

func ConnectDB() *mongo.Collection {

	// Set client options
	clientOptions := options.Client().ApplyURI("mongodb://localhost:27017")

	// Connect to MongoDB
	client, err := mongo.Connect(context.TODO(), clientOptions)

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Connected to MongoDB!")

	collection := client.Database("go-server").Collection("cars")

	return collection
}

func main() {

	r := mux.NewRouter()
	r.HandleFunc("/api/cars", getCars).Methods("GET")
	r.HandleFunc("/api/cars", postCars).Methods("POST")
	r.HandleFunc("/api/cars/{id}", deleteCar).Methods("DELETE")

	log.Fatal(http.ListenAndServe(":8080", r))
}
func getCars(w http.ResponseWriter, r *http.Request) {
	collection := ConnectDB()
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")
	var cars []models.Cars
	cur, err := collection.Find(context.TODO(), bson.M{})
	if err != nil {
		log.Fatal(err)
		return
	}
	defer cur.Close(context.TODO())

	for cur.Next(context.TODO()) {

		var car models.Cars

		err := cur.Decode(&car)
		if err != nil {
			log.Fatal(err)
		}
		cars = append(cars, car)
	}

	if err := cur.Err(); err != nil {
		log.Fatal(err)
	}

	json.NewEncoder(w).Encode(cars)
}

func postCars(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Headers", "*")

	var car models.Cars
	_ = json.NewDecoder(r.Body).Decode(&car)
	collection := ConnectDB()
	result, err := collection.InsertOne(context.TODO(), car)
	if err != nil {
		log.Fatal(err)
		return
	}

	json.NewEncoder(w).Encode(result)

}

func deleteCar(w http.ResponseWriter, r *http.Request) {
	collection := ConnectDB()
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "*")
	var params = mux.Vars(r)
	id, err := primitive.ObjectIDFromHex(params["id"])
	if err != nil {
		log.Fatal(err)
		return
	}
	filter := bson.M{"_id": id}
	deleteResult, err := collection.DeleteOne(context.TODO(), filter)
	if err != nil {
		log.Fatal(err)
		return
	}
	json.NewEncoder(w).Encode(deleteResult)
}
