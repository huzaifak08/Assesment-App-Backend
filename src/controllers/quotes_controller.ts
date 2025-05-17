import { Response } from "express";

export const getRandomQuote = async (req: any, res: Response): Promise<any> => {
  try {
    const headers: Headers = new Headers();
    headers.set("X-Api-Key", process.env.X_API_KEY || "");

    const request = new Request("https://api.api-ninjas.com/v1/quotes", {
      method: "GET",
      headers: headers,
    });

    const response = await fetch(request);

    if (response.status === 200) {
      const data = await response.json();

      return res.status(200).json({
        status: true,
        message: `Quote fetched successfully`,
        data: data,
      });
    } else {
      return res.status(501).json({
        status: false,
        message: `Got a ${response.status} from quotes API`,
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
};
