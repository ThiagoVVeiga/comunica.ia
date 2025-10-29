import axios from 'axios';
// Tipos locais para evitar dependência circular
interface ArasaacPictogram {
  _id: number;
  keywords: Array<{
    keyword: string;
    meaning: string;
    lse: boolean;
    locImg: string;
  }>;
  created: string;
  lastUpdated: string;
  downloads: number;
  tags: string[];
  sex: boolean;
  violence: boolean;
  aac: boolean;
  aacColor: boolean;
  skin: boolean;
  hair: boolean;
  categories: string[];
  pictos: Array<{
    _id: number;
    image: string;
    color: boolean;
    b64: string;
  }>;
}

interface ArasaacCategory {
  id: number;
  name: string;
  description: string;
  pictograms: number[];
}

const ARASAAC_BASE_URL = process.env.ARASAAC_API_URL || 'https://api.arasaac.org';

class ArasaacService {
  private api = axios.create({
    baseURL: ARASAAC_BASE_URL,
    timeout: 10000,
    headers: {
      'Accept': 'application/json',
      'User-Agent': 'TD-Snap-Web/1.0.0'
    }
  });

  /**
   * Busca pictogramas por termo
   */
  async searchPictograms(term: string, language: string = 'pt'): Promise<ArasaacPictogram[]> {
    try {
      const response = await this.api.get(`/pictograms/${language}/search/${encodeURIComponent(term)}`);
      return response.data || [];
    } catch (error) {
      console.error('Erro ao buscar pictogramas:', error);
      throw new Error('Falha ao buscar pictogramas da ARASAAC');
    }
  }

  /**
   * Busca pictogramas por categoria
   */
  async getPictogramsByCategory(categoryId: number, language: string = 'pt'): Promise<ArasaacPictogram[]> {
    try {
      const response = await this.api.get(`/pictograms/${language}/category/${categoryId}`);
      return response.data || [];
    } catch (error) {
      console.error('Erro ao buscar pictogramas por categoria:', error);
      throw new Error('Falha ao buscar pictogramas por categoria');
    }
  }

  /**
   * Obtém todos os pictogramas
   */
  async getAllPictograms(language: string = 'pt', limit: number = 1000): Promise<ArasaacPictogram[]> {
    try {
      const response = await this.api.get(`/pictograms/${language}`, {
        params: { limit }
      });
      return response.data || [];
    } catch (error) {
      console.error('Erro ao buscar todos os pictogramas:', error);
      throw new Error('Falha ao buscar pictogramas');
    }
  }

  /**
   * Obtém categorias
   */
  async getCategories(language: string = 'pt'): Promise<ArasaacCategory[]> {
    try {
      const response = await this.api.get(`/categories/${language}`);
      return response.data || [];
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
      throw new Error('Falha ao buscar categorias');
    }
  }

  /**
   * Obtém um pictograma específico
   */
  async getPictogram(id: number, language: string = 'pt'): Promise<ArasaacPictogram | null> {
    try {
      const response = await this.api.get(`/pictograms/${language}/${id}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return null;
      }
      console.error('Erro ao buscar pictograma:', error);
      throw new Error('Falha ao buscar pictograma');
    }
  }

  /**
   * Obtém a URL da imagem do pictograma
   */
  getPictogramImageUrl(id: number, color: boolean = true, size: number = 500): string {
    return `${ARASAAC_BASE_URL}/pictograms/${id}?download=false&color=${color}&width=${size}`;
  }

  /**
   * Obtém a URL da imagem em preto e branco
   */
  getPictogramBwImageUrl(id: number, size: number = 500): string {
    return `${ARASAAC_BASE_URL}/pictograms/${id}?download=false&color=false&width=${size}`;
  }

  /**
   * Sincroniza pictogramas com o banco local
   */
  async syncPictograms(language: string = 'pt'): Promise<void> {
    try {
      console.log('Iniciando sincronização de pictogramas...');
      
      // Buscar categorias
      const categories = await this.getCategories(language);
      console.log(`Encontradas ${categories.length} categorias`);

      // Buscar pictogramas
      const pictograms = await this.getAllPictograms(language);
      console.log(`Encontrados ${pictograms.length} pictogramas`);

      // TODO: Implementar lógica de sincronização com banco local
      // Por enquanto, apenas log
      console.log('Sincronização concluída');
      
    } catch (error) {
      console.error('Erro na sincronização:', error);
      throw new Error('Falha na sincronização de pictogramas');
    }
  }
}

export default new ArasaacService();
