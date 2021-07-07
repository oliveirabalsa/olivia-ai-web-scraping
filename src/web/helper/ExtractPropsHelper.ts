import cheerio from "cheerio";
import IApiProps from "../../useCase/dto/IApiProps";

class ExtractPropHelper {
  execute(pageContent: string): IApiProps {
    const $ = cheerio.load(pageContent);

    const script = $("script").get()[1].children[0].data;

    const contentScript = script
      .replace("$.ajax({", "")
      .replace(/\n\s*/gi, "")
      .split(",");

    const props = contentScript.map((item: string) =>
      item
        .split(":")
        .map((i: string) => (i.includes("'") || i.includes('"') ? i : null))
        .filter((i) => i)
    );

    const [path, method, type, cookieKeyValue] = props
      .slice(0, 4)
      .map((prop: string[]) => {
        prop = prop.map((item) => item.replace(/['"{}]/gi, "").trim());

        if (prop.length > 1) {
          return prop[0] + "," + prop[1];
        }
        return prop[0];
      });

    const [apiKeyProp, apiKeyValue] = cookieKeyValue.split(",");

    return {
      path,
      method,
      type,
      apiKeyProp,
      apiKeyValue,
    };
  }
}

export default new ExtractPropHelper();
