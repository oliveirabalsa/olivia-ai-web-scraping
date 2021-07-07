import slugify from "../helper/StringToSlugHelper";
import fs from "fs";

class WriteToFileHelper {
  execute(file: string, path: string, extension?: string) {
    const filename = `src/domain/cache/${slugify.execute(path)}.${
      extension || "html"
    }`;
    fs.writeFile(filename, file, (err) => {
      if (err) {
        throw new Error("Error during save: " + err.message);
      }
    });
  }
}

export default new WriteToFileHelper();
