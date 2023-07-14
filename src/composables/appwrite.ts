import { Client, Databases } from "appwrite";
import { ref } from "vue";


const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const databases = new Databases(client);

export function useThemes() {
  const theme = ref<string>("");
  async function get() {
    const themes = (
      await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID,
        [],
      )
    ).documents.map((doc) => doc.theme) as string[];
    theme.value = themes[(Math.random() * themes.length) | 0];
  }

  return {
    theme,
    get,
  };
}
