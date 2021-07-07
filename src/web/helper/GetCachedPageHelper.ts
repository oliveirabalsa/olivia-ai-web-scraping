import fs from "fs";
import slugify from "../helper/StringToSlugHelper";

class GetCachedPageHelper {
  async execute(path: string, extension?: string): Promise<string | null> {
    const filename = `src/domain/cache/${slugify.execute(path)}.${
      extension || "html"
    }`;

    try {
      const content = await fs.readFileSync(filename, "utf8");
      return content;
    } catch (e) {
      return null;
    }
  }
}

export default new GetCachedPageHelper();
