class ExcursionsAPI {
  constructor() {
    this.url = "http://localhost:3000";
  }

  async loadExcursions() {
    const excursionsList = await this.fetchExcursions();
    this.setIdToString(excursionsList);
    return { excursionsList };
  }

  setIdToString(excursionsList) {
    excursionsList.forEach((item) => {
      if (typeof item.id !== "string") {
        item.id = item.id.toString();
      }
    });
  }

  async fetchExcursions() {
    const response = await fetch(`${this.url}/excursions`);

    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Fetching excursions responded in an error.");
    }
  }

  async postData(obj, place) {
    const options = {
      method: "POST",
      body: JSON.stringify(obj),
      headers: { "Content-Type": "application/json" },
    };

    const result = await fetch(`${this.url}/${place}`, options);

    if (result.ok) {
      console.log("Data posted successfully.");
    } else {
      alert.log("Error: fetch - POST");
    }
  }

  async putData(obj, place, id) {
    const options = {
      method: "PUT",
      body: JSON.stringify(obj),
      headers: { "Content-Type": "application/json" },
    };

    const result = await fetch(`${this.url}/${place}/${id}`, options);

    if (result.ok) {
      console.log("Data put successfully.");
    } else {
      alert.log("Error: fetch - PUT");
    }
  }

  async deleteData(place, id) {
    const options = {
      method: "DELETE",
    };

    const result = await fetch(`${this.url}/${place}/${id}`, options);

    if (result.ok) {
      console.log("Data deleted successfully.");
    } else {
      alert.log("Error: fetch - DELETE");
    }
  }
}

export default ExcursionsAPI;
