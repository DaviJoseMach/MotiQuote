## API

Motiquote uses a custom data source to provide a unique collection of motivational quotes. Our system combines quotes stored locally in a JSON file in the project directory with other quotes stored in the cloud. All of this is integrated into a single JSON to ensure greater control, diversity and flexibility in delivering motivational content to users.

### JSON Structure

Each quote in JSON is stored in the following format:

```json
{
"text": "It does not do to dwell on dreams and forget to live.",
"author": "J.K. Rowling",
"language": "en"
}
```

- **Text**: Represents the motivational quote.
- **Author**: Is the author of the quote.
- **Language**: Defines the language of the quote, being "en" for English or "pt" for Portuguese. This property is used to filter and separate quotes by language.

### Import and Usage Example

You can easily import JSON into your project and use the stored quotes. Below are examples of how to import and use it in your code:

#### Importing JSON

```javascript
import quotesData from './quotes.json';
```

#### Function to Get a Random Quote in English

```javascript
const getQuote = () => {
const englishQuotes = quotesData.filter(quote => quote.language === 'en');
if (englishQuotes.length === 0) {
setQuote('No quotes available in English.');
return;
}
const randomIndex = Math.floor(Math.random() * englishQuotes.length);
const quoteData = englishQuotes[randomIndex]; const newQuote = `${quoteData.text} - ${quoteData.author || 'Unknown'}`;
setQuote(newQuote);
setCopied(false);
};
```

### Additional Features

- **Interoperability**: Our system is designed to work seamlessly with local and remote data, providing a seamless experience for users.
- **Dynamic Update**: The integration of local and cloud data allows new quotes to be added or removed easily, keeping content always up to date.
- **Personalization**: With quotes organized by language and author, the system allows for easy customization and filtering to suit different user preferences.