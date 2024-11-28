import app from "../firebaseConfig";
import { getDatabase, ref, set, push, get, remove } from "firebase/database";

class FirebaseFetch {
  async fetchData() {
    const db = getDatabase(app);
    const dbRef = ref(db, "/excursions");
    let resultArray = [];

    try {
      const snapshot = await get(dbRef);
      const result = snapshot.val();
      for (const key in result) {
        const newObj = {
          id: key,
          ...result[key],
        };

        resultArray.push(newObj);
      }
      console.log("Data fetched successfully!");
    } catch (error) {
      throw new Error(`FETCH - failed, status: ${error}`);
    }

    return resultArray;
  }

  async pushData(obj) {
    const db = getDatabase(app);
    const dbRef = ref(db, "/excursions");

    try {
      await push(dbRef, obj);
      console.log("Data pushed successfully!");
    } catch (error) {
      throw new Error(`PUSH - failed, status: ${error}`);
    }
  }

  async removeData(id) {
    const db = getDatabase(app);
    const dbRef = ref(db, `/excursions/${id}`);
    try {
      await remove(dbRef);
    } catch (error) {
      throw new Error(`REMOVE - failed, status: ${error}`);
    }
  }

  async updateData(id, obj) {
    const db = getDatabase(app);
    const dbRef = ref(db, `/excursions/${id}`);

    try {
      await set(dbRef, obj);
    } catch (error) {
      throw new Error(`UPDATE - failed, status: ${error}`);
    }
  }
}

export default FirebaseFetch;
