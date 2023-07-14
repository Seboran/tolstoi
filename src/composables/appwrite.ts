import { Client, Databases } from 'appwrite';
import { ref } from 'vue';

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('64b1807cd2137e3dea7e');

const databases = new Databases(client)


export function useThemes() {
  const themes = ref<any>([])
  async function get() { 
    themes.value = await databases.listDocuments("64b1811aa1d9b2df604f", "64b18120642da48a6b94")
  }


    return {
      themes,
      get
    };
}