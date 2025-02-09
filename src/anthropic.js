import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function summarize_document(
  text,
  model = "claude-3-5-sonnet-20241022",
  max_tokens = 1000
) {
  const prompt = `Summarize the following information into a title, five relevant tags, and a short description. Keep it concise and informative.
    Provide the details in an array of length 3 in JSON Format. No extra words except this array. For example:
    [{"title": "<title>"},{"tags": ["tag 1", "tag 2", "tag 3", "tag 4", "tag 5"]},{"shortDescription": "<shortDescription>"}
]
    Information: ${text}`;
  const response = await anthropic.messages.create({
    model: model,
    max_tokens: max_tokens,
    system: `You are an AI assistant that helps summarize bookmarked web pages. Given any text or content, generate:

A concise title (within 8 words) that captures the main idea.
Five relevant tags that categorize the content.
A short description (max 40 words) summarizing the key points.
Ensure clarity, accuracy, and relevance in the output.`,
    messages: [
      { role: "user", content: prompt },
      {
        role: "assistant",
        content: "Here is the summary of the bookmarked webpage: <summary>",
      },
    ],
    stop_sequences: ["</summary>"],
  });

  return response.content[0].text;
}

// const bookmark_summary = await summarize_document(get_details());
// return bookmark_summary;
// console.log(bookmark_summary);

// const anthropic = new Anthropic({
//   // defaults to process.env["ANTHROPIC_API_KEY"]
//   apiKey: "my_api_key",
// });

// const msg = await anthropic.messages.create({
//   model: "claude-3-5-sonnet-20241022",
//   max_tokens: 1000,
//   temperature: 0,
//   system: "Respond only with short poems.",
//   messages: [
//     {
//       role: "user",
//       content: [
//         {
//           type: "text",
//           text: "Why is the ocean salty?",
//         },
//       ],
//     },
//   ],
// });
// console.log(msg);
