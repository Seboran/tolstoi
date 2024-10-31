export default interface VisiteurSolution<TSolution, UReponseVisiteur> {
  visit(solution: TSolution): UReponseVisiteur
}
