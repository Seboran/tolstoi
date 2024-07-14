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
  indexBeneficiaires: number[]
  montant: number
  indexDepenseur: number
}

interface IHistoriqueDepenses {
  depense: IEnregistrementDepense[]
  noms: string[]
}

interface IEnregistrementDepenseDto extends IEnregistrementDepense, Models.Document {
  indexBeneficiaires: number[]
  montant: number
  indexDepenseur: number
}
interface IHistoriqueDepensesDto extends IHistoriqueDepenses, Models.Document {
  depense: IEnregistrementDepenseDto[]
}

class EnregistrementDepense implements IEnregistrementDepense {
  indexBeneficiaires: number[]
  montant: number
  indexDepenseur: number
  constructor(value: IEnregistrementDepenseDto) {
    this.indexBeneficiaires = value.indexBeneficiaires
    this.montant = value.montant
    this.indexDepenseur = value.indexDepenseur
  }
}

class HistoriqueDepenses implements IHistoriqueDepenses {
  depense: EnregistrementDepense[]
  noms: string[]
  constructor(value: IHistoriqueDepenses) {
    this.depense = value.depense
    this.noms = value.noms
  }
}

async function get(id: string): Promise<HistoriqueDepenses> {
  const document = (await databases.getDocument(
    APPWRITE_DOCUMENT_ID,
    APPWRITE_COLLECTION_ID,
    id
  )) as IHistoriqueDepensesDto

  return mapDocumentToHistoriqueDepense(document)
}

type IdEtHistoriqueDepense = {
  id: string
} & HistoriqueDepenses

async function add(balances: IHistoriqueDepenses): Promise<IdEtHistoriqueDepense> {
  const id = ID.unique()

  const documentCree = (await databases.createDocument(
    APPWRITE_DOCUMENT_ID,
    APPWRITE_COLLECTION_ID,
    id,
    balances
  )) as IHistoriqueDepensesDto

  const historiqueDepense = mapDocumentToHistoriqueDepense(documentCree)
  return { noms: historiqueDepense.noms, depense: historiqueDepense.depense, id: documentCree.$id }
}

async function update(balances: IHistoriqueDepenses, id: string): Promise<HistoriqueDepenses> {
  const documentMiseAJour = (await databases.updateDocument(
    APPWRITE_DOCUMENT_ID,
    APPWRITE_COLLECTION_ID,
    id,
    balances
  )) as IHistoriqueDepensesDto

  return mapDocumentToHistoriqueDepense(documentMiseAJour)
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
    depense: document.depense.map((depense) => new EnregistrementDepense(depense)),
    noms: document.noms
  })
}
