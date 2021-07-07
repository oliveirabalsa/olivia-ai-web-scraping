import GetInitalPageUseCaseImpl from "../../useCase/implementation/GetInitalPageUseCaseImpl";
import ExtractCredentialsUseCaseImpl from "../../useCase/implementation/ExtractCredentialsUseCaseImpl";
import MakeLoginUseCaseImpl from "../../useCase/implementation/MakeLoginUseCaseImpl";
import { Request, Response } from "express";
import ExtractContentUseCaseImpl from "../../useCase/implementation/ExtractContentUseCaseImpl";

class App {
  public async init(request: Request, response: Response): Promise<Response> {
    const getInitialPageUseCase = new GetInitalPageUseCaseImpl();
    const extractCredentialsUseCase = new ExtractCredentialsUseCaseImpl();
    const makeLoginUseCase = new MakeLoginUseCaseImpl();
    const extractContentUseCase = new ExtractContentUseCaseImpl();

    // TO DO create a cache funtion with FileSystem
    // const initialPage = await getInitialPageUseCase.execute();
    const initialPage =
      '<h1>Web Scraping Exam</h1>\n<form action="/login" method="post">\n\t<div>\n\t<label>Username:</label>\n\t<input type="text" name="username"/><br/>\n\t</div>\n\t<div>\n\t<label>Password:</label>\n\t<input type="password" name="password"/>\n\t</div>\n\t<div>\n\t<input type="submit" value="Submit"/>\n\t</div>\n</form>\n<h2>\n\tValid credentials:\n</h2>\n<div>\n\t<div>user: \'olivia\', password: \'oliveira\'</div>\n\t<div>user: \'oliver\', password: \'olivia\'</div>\n</div>';

    // TO DO create a cache funtion with FileSystem
    // const credentials = extractCredentialsUseCase.execute(initialPage);
    const credentials = { user: "olivia", password: "oliveira" };

    // TO DO create a cache funtion with FileSystem
    const { pageContent, pageCookies } = await makeLoginUseCase.execute(
      credentials
    );
    // const finalPage =
    //   "<html><head><script src=\"https://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js\"></script>\n<script type=\"text/javascript\">\n  $.ajax({\n    url: \"/stocks/alphabet\",\n    type: 'GET',\n    dataType: 'json', // added data type\n    headers: {\n      'x-olivia-exam': 'alphabet-stock'\n    },\n    success: function (res) {\n      var trHTML = '';\n      if (res.yearlyFinancials) {\n        $.each(res.yearlyFinancials, function (i, item) {\n            trHTML += '<tr><td>' + item.year + '</td><td>' + item.equity + '</td><td>' + item.revenue + '</td><td>' + item.ebitda + '</td></tr>';\n        });\n        $('#financial').append(trHTML);\n      }\n    }\n  });\n</script>\n</head><body><h1>Alphabet data</h1>\n<div>\n  <table>\n    <tbody>\n      <tr>\n        <td>Open</td>\n        <td>75.30</td>\n      </tr>\n      <tr>\n        <td>High</td>\n        <td>75.89</td>\n      </tr>\n      <tr>\n        <td>Low</td>\n        <td>74.54</td>\n      </tr>\n      <tr>\n        <td>Mkt cap</td>\n        <td>-</td>\n      </tr>\n      <tr>\n        <td>P/E ratio</td>\n        <td>-</td>\n      </tr>\n    </tbody>\n  </table>\n  <table>\n    <tbody>\n      <tr>\n        <td>Div yield</td>\n        <td>-</td>\n      </tr>\n      <tr>\n        <td>Prev close</td>\n        <td>75.30</td>\n      </tr>\n      <tr>\n        <td>52-wk high</td>\n        <td>371.10</td>\n      </tr>\n      <tr>\n        <td>52-wk low</td>\n        <td>57.96</td>\n      </tr>\n    </tbody>\n  </table>\n</div>\n\n<h2>Yearly Financial (Unstable API)</h2>\n<div>\n  <table id=\"financial\">\n    <tbody><tr>\n        <th>Year</th>\n        <th>Equity</th>\n        <th>Revenue</th>\n        <th>EBITDA</th>\n    </tr>\n<tr><td>12/2016</td><td>19285</td><td>135987</td><td>12492</td></tr><tr><td>12/2017</td><td>27709</td><td>177866</td><td>16132</td></tr><tr><td>12/2018</td><td>43549</td><td>232887</td><td>28019</td></tr></tbody></table>\n</div>\n\n<a href=\"/logout\">Log out</a></body></html>";

    // Função .html() do Cheerio e page.content() do play, testar afim de pegar o content da pagina com o ajax para fazer a busca com o axios
    /*
      $.ajax({
    url: "/stocks/alphabet",
    type: 'GET',
    dataType: 'json', // added data type
    headers: {
      'x-olivia-exam': 'alphabet-stock'
    },
    success: function (res) {
      var trHTML = '';
      if (res.yearlyFinancials) {
        $.each(res.yearlyFinancials, function (i, item) {
            trHTML += '<tr><td>' + item.year + '</td><td>' + item.equity + '</td><td>' + item.revenue + '</td><td>' + item.ebitda + '</td></tr>';
        });
        $('#financial').append(trHTML);
      }
    }
  });


  var text = "Meu nome <meuNome@email.com>";
var regex = /(url:)(.*)(,)/;
console.log(regex.exec(text)[2]);




    */

    const content = await extractContentUseCase.execute(
      pageContent,
      pageCookies
    );

    // TO DO create an useCase to get content and return an Financial interface
    ///////////////

    return response.status(200).json(content);
  }
}

export default new App();
