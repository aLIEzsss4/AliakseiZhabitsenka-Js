export interface IHomePageProps {
  match: {
    params: {
      category: string | undefined
    }
  }
}

export interface IHomePageState {
  page: number
}