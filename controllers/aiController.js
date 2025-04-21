import { createApiError } from '../middleware/errorHandler.js'

const key = process.env.OPENROUTER_KEY

export const generateDescription = async (req, res, next) => {
  // Uncomment this line if you're testing and don't want to hit rate limits:
  // return res.status(200).json({ description: 'This is a test description' })

  if (!key) {
    console.error('OpenRouter key is not set')
    return res.status(200).json({ description: 'Could not generate description' })
  }

  const postMarkdown = req.body.postMarkdown

  if (!postMarkdown) {
    return next(createApiError(400, 'Post markdown content is required'))
  }

  const prompt = `You are a helpful assistant that generates concise and engaging descriptions for blog posts. Your responses MUST be in JSON format, containing ONLY a "description" field. The description should be a single sentence.  Focus on capturing the essence of the blog post and piquing the reader's interest. DO NOT include any introductory or concluding phrases outside of the JSON structure. Do not answer as an AI model, instead just follow the instructions.

    Blog Post Content:
    ${postMarkdown}

    Output (JSON):`

  try {
    const completion = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        models: ['mistralai/Mistral-small-3.1-24b-instruct:free', 'meta-llama/llama-4-scout:free'],
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      }),
    })

    const data = await completion.json()
    if (data.error) {
      console.error(data.error)
      return next(createApiError(500, 'Failed to generate description'))
    }

    const rawContent = data.choices[0].message.content

    // Remove codeblock backticks and "json" label
    const jsonString = rawContent.replace(/^```(json)?\n?/, '').replace(/```$/, '')

    const jsonResponse = JSON.parse(jsonString)
    console.log(jsonResponse)
    return res.status(200).json(jsonResponse)
  } catch (err) {
    console.error('Error in AI description generation:', err)
    next(err)
  }
}
