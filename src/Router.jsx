import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import HomePage from './components/HomePage';
import SobrePage from './components/SobrePage';
import MapaPage from './components/MapaPage';
import LugaresPage from './components/LugaresPage';
import PerfilPage from './components/PerfilPage';
import CristoRedentor from './components/CristoRedentor';
import PaoDeAcucar from './components/PaoDeAcucar';
import CataratasIguacu from './components/CataratasIguacu';
import Pelourinho from './components/Pelourinho';
import FernandoNoronha from './components/FernandoNoronha';
import Pantanal from './components/Pantanal';
import AmazonasPage from './components/AmazonasPage'
import MonumentosAmazonas from './components/MonumentosAmazonas'
import MonumentosAmazonas2 from './components/MonumentosAmazonas2'
import TeatroAmazonas from './components/TeatroAmazonas'
import ForteSaoJose from './components/ForteSaoJose'
import PalacioJustica from './components/PalacioJustica'
import MercadoMunicipal from './components/MercadoMunicipal'
import IgrejaSaoSebastiao from './components/IgrejaSaoSebastiao'
import PalacioRioNegro from './components/PalacioRioNegro'
import NaturezaAmazonas from './components/NaturezaAmazonas'
import EncontroAguas from './components/EncontroAguas'
import ParqueJau from './components/ParqueJau'
import ReservaMamiraua from './components/ReservaMamiraua';
import FlorestaAmazonica from './components/FlorestaAmazonica';
import RioAmazonas from './components/RioAmazonas';
import ParqueAnavilhanas from './components/ParqueAnavilhanas';
import CulturaAmazonas from './components/CulturaAmazonas';
import FestivalParintins from './components/FestivalParintins';
import LendasAmazonicas from './components/LendasAmazonicas';
import ArtesanatoIndigena from './components/ArtesanatoIndigena';
import MusicaRegional from './components/MusicaRegional';
import DancasFolcloricas from './components/DancasFolcloricas';
import LiteraturaCordel from './components/LiteraturaCordel';
import GastronomiaAmazonas from './components/GastronomiaAmazonas';
import Tacaca from './components/Tacaca';
import Pirarucu from './components/Pirarucu';
import Cupuacu from './components/Cupuacu';
import Acai from './components/Acai';
import Tucuma from './components/Tucuma';
import FarinhaMandioca from './components/FarinhaMandioca';
import ContatoPage from './components/ContatoPage';
import Login from './Login';
import MapaPageFuncional from './components/MapaPageFuncional';


function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sobre" element={<SobrePage />} />

        <Route path="/lugares" element={<LugaresPage />} />
        <Route path="/perfil" element={<PerfilPage />} />
        <Route path="/cristo-redentor" element={<CristoRedentor />} />
        <Route path="/pao-de-acucar" element={<PaoDeAcucar />} />
        <Route path="/cataratas-iguacu" element={<CataratasIguacu />} />
        <Route path="/pelourinho" element={<Pelourinho />} />
        <Route path="/fernando-noronha" element={<FernandoNoronha />} />
        <Route path="/pantanal" element={<Pantanal />} />
        <Route path="/amazonas" element={<AmazonasPage />} />
        <Route path="/amazonas/monumentos" element={<MonumentosAmazonas2 />} />
        <Route path="/amazonas/monumentos2" element={<MonumentosAmazonas2 />} />
        <Route path="/teatro-amazonas" element={<TeatroAmazonas />} />
        <Route path="/forte-sao-jose" element={<ForteSaoJose />} />
        <Route path="/palacio-justica" element={<PalacioJustica />} />
        <Route path="/mercado-municipal" element={<MercadoMunicipal />} />
        <Route path="/igreja-sao-sebastiao" element={<IgrejaSaoSebastiao />} />
        <Route path="/palacio-rio-negro" element={<PalacioRioNegro />} />
        <Route path="/amazonas/natureza" element={<NaturezaAmazonas />} />
        <Route path="/encontro-aguas" element={<EncontroAguas />} />
        <Route path="/parque-jau" element={<ParqueJau />} />
        <Route path="/reserva-mamiraua" element={<ReservaMamiraua />} />
        <Route path="/floresta-amazonica" element={<FlorestaAmazonica />} />
        <Route path="/rio-amazonas" element={<RioAmazonas />} />
        <Route path="/parque-anavilhanas" element={<ParqueAnavilhanas />} />
        <Route path="/amazonas/cultura" element={<CulturaAmazonas />} />
        <Route path="/festival-parintins" element={<FestivalParintins />} />
        <Route path="/lendas-amazonicas" element={<LendasAmazonicas />} />
        <Route path="/artesanato-indigena" element={<ArtesanatoIndigena />} />
        <Route path="/musica-regional" element={<MusicaRegional />} />
        <Route path="/dancas-folcloricas" element={<DancasFolcloricas />} />
        <Route path="/literatura-cordel" element={<LiteraturaCordel />} />
        <Route path="/amazonas/gastronomia" element={<GastronomiaAmazonas />} />
        <Route path="/tacaca" element={<Tacaca />} />
        <Route path="/pirarucu" element={<Pirarucu />} />
        <Route path="/cupuacu" element={<Cupuacu />} />
        <Route path="/acai" element={<Acai />} />
        <Route path="/tucuma" element={<Tucuma />} />
        <Route path="/farinha-mandioca" element={<FarinhaMandioca />} />
        <Route path="/contato" element={<ContatoPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mapa" element={<MapaPageFuncional />} />

      </Routes>
    </BrowserRouter>
  );
}

export default Router;