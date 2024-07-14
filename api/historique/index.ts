import { Models } from 'appwrite'
import { Client, Databases, ID } from 'node-appwrite'

const APPWRITE_DOCUMENT_ID = process.env.APPWRITE_DOCUMENT_ID!
const APPWRITE_COLLECTION_ID = process.env.APPWRITE_COLLECTION_ID!
const APPWRITE_API_KEY = process.env.APPWRITE_API_KEY
const APPWRITE_PROJECT_ID = process.env.APPWRITE_PROJECT_ID!
const APPWRITE_ENDPOINT = process.env.APPWRITE_ENDPOINT!

const client = new Client()
client.setEndpoint(APPWRITE_ENDPOINT).setProject(APPWRITE_PROJECT_ID).setKey(APPWRITE_API_KEY!)
const databases = new Databases(client)

interface IEnregistrementDepense {
  beneficiaires: string[]
  montant: number
  depenseur: string
}

interface IHistoriqueDepenses {
  depense: IEnregistrementDepense[]
}

interface IEnregistrementDepenseDto extends IEnregistrementDepense, Models.Document {
  beneficiaires: string[]
  montant: number
  depenseur: string
}
interface IHistoriqueDepensesDto extends IHistoriqueDepenses, Models.Document {
  depense: IEnregistrementDepenseDto[]
}

class EnregistrementDepense implements IEnregistrementDepense {
  beneficiaires: string[]
  montant: number
  depenseur: string
  constructor(value: IEnregistrementDepenseDto) {
    this.beneficiaires = value.beneficiaires
    this.montant = value.montant
    this.depenseur = value.depenseur
  }
}

class HistoriqueDepenses implements IHistoriqueDepenses {
  depense: EnregistrementDepense[]
  constructor(value: IHistoriqueDepenses) {
    this.depense = value.depense
  }
}

type HistoriqueDepenseValue = HistoriqueDepenses['depense']

async function get(id: string): Promise<HistoriqueDepenseValue> {
  const document = (await databases.getDocument(
    APPWRITE_DOCUMENT_ID,
    APPWRITE_COLLECTION_ID,
    id
  )) as IHistoriqueDepensesDto

  return mapDocumentToHistoriqueDepense(document).depense
}

async function add(balances: IHistoriqueDepenses): Promise<HistoriqueDepenseValue> {
  const id = ID.unique()

  const documentCree = (await databases.createDocument(
    APPWRITE_DOCUMENT_ID,
    APPWRITE_COLLECTION_ID,
    id,
    balances
  )) as IHistoriqueDepensesDto

  return mapDocumentToHistoriqueDepense(documentCree).depense
}

async function update(balances: IHistoriqueDepenses, id: string): Promise<HistoriqueDepenseValue> {
  const documentMiseAJour = (await databases.updateDocument(
    APPWRITE_DOCUMENT_ID,
    APPWRITE_COLLECTION_ID,
    id,
    balances
  )) as IHistoriqueDepensesDto

  return mapDocumentToHistoriqueDepense(documentMiseAJour).depense
}

export async function POST(req: Request) {
  const url = new URL(req.url)
  const id = url.searchParams.get('id')

  if (!id) {
    return new Response(JSON.stringify({ error: 'ID parameter is missing' }), { status: 400 })
  }

  const balance = (await req.json()) as IHistoriqueDepenses

  return Response.json(await update(balance, id))
}

export async function GET(req: Request) {
  const url = new URL(req.url)
  const id = url.searchParams.get('id')

  if (!id) {
    return new Response(JSON.stringify({ error: 'ID parameter is missing' }), { status: 400 })
  }

  return Response.json(await get(id))
}

export async function PUT(req: Request) {
  const body = (await req.json()) as IHistoriqueDepenses
  return Response.json(await add(body))
}

function mapDocumentToHistoriqueDepense(document: IHistoriqueDepensesDto): HistoriqueDepenses {
  return new HistoriqueDepenses({
    depense: document.depense.map((depense) => new EnregistrementDepense(depense))
  })
}
