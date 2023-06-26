import { getStorage } from "firebase/storage";

import app from ".";

const storage = getStorage(app);

export default storage;
